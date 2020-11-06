const products = require('../static/mock/products.json')

const got = require('got')
const QS = require('querystring')
const API_KEY = '18963604-e2407b68dfdc90a64cfb92c12' // your pixabay API key

const fs = require('fs')
const { promisify } = require('util')

const writeFileAsync = promisify(fs.writeFile)

async function fetchApiImg(searchQuery) {
    try {
        const query = QS.stringify({ key: API_KEY, q: searchQuery, per_page: '3', image_type: 'photo', orientation: 'horizontal', category: 'animals' })
        const resPr = got(`https://pixabay.com/api/?${query}`)
        const json = await resPr.json()
        if (json.hits && json.hits.length > 0 && json.hits[0].largeImageURL && json.hits[0].webformatURL) {
            return {
                imgXL: json.hits[0].largeImageURL,
                imgL: json.hits[0].webformatURL
            }
        } else {
            throw 'no image'
        }
    } catch (error) {
        console.log(error, searchQuery);
        return {
            imgXL: "https://cdn.pixabay.com/photo/2013/05/14/18/25/frog-111179_1280.jpg",
            imgL: "https://cdn.pixabay.com/photo/2013/05/14/18/25/frog-111179_1280.jpg"
        }
    }
}
async function getImagesUrls() {
    let imagesUrlWithId =
        products.map(product => {
            const productName = product.name.split(' ')[0]
            const urls = fetchApiImg(productName)
            return { id: product.id, urls }
        })
    const imagesUrls = await Promise.all(imagesUrlWithId.map(iu => iu.urls))
    imagesUrlWithId = imagesUrlWithId.map((ob, index) => {
        return {
            id: ob.id,
            urls: imagesUrls[index]
        }
    }
    )
    return imagesUrlWithId
}
async function main() {
    try {
        const imagesUrls = await getImagesUrls()
        await writeFileAsync('./static/mock/products-images.json', JSON.stringify(imagesUrls), { flag: 'w+' })
    } catch (error) {
        console.log(error)
    }
}
main()
