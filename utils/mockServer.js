const sampleSize = require('lodash.samplesize')
const categories = [
    {
        id: 1,
        title: 'Cats',
        name: 'Cats',
        slug: 'cats',
        metaDescription: 'Meta description',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, voluptatem! Dolorum accusantium asperiores aperiam laudantium!',
        image: 'https://source.unsplash.com/300x300/?cat,cats',
        products: []
    },
    {
        id: 2,
        title: 'Dogs',
        name: 'Dogs',
        slug: 'dogs',
        metaDescription: 'Meta description',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nostrum illo error exercitationem vitae porro quaerat vero excepturi voluptas quasi?',
        image: 'https://source.unsplash.com/300x300/?dog,dogs',
        products: []
    },
    {
        id: 3,
        title: 'Wolfs',
        name: 'Wolfs',
        slug: 'wolfs',
        metaDescription: 'Meta description',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error eum libero dolor laborum quidem consequuntur optio tempora dolorem quos, ullam voluptatibus magnam nihil ex totam laboriosam doloremque nulla! Quasi, aliquam.',
        image: 'https://source.unsplash.com/300x300/?wolf',
        products: []
    },
    {
        id: 4,
        title: 'Bulls',
        name: 'Bulls',
        slug: 'bulls',
        metaDescription: 'Meta description',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga qui exercitationem facilis? Facilis quaerat nobis amet sint nam expedita natus dolores, impedit quos veritatis repellendus explicabo, velit est omnis itaque!',
        image: 'https://source.unsplash.com/300x300/?ox',
        products: []
    }
]

function getProductsByIds(products, productsImages, ids) {
    const innerProducts = products.filter(p => p.id === ids.find(id => p.id === id))
    if (!innerProducts) return null
    return innerProducts.map(product => {
        return {
            ...product,
            images: productsImages.find(img => img.id === product.id).urls,
            category: categories.find(cat => cat.id === product.category_id)
        }
    })
}
function getProduct(products, productsImages, productSlug) {
    const innerProduct = products.find(p => p.slug === productSlug)
    if (!innerProduct) return null
    return {
        ...innerProduct,
        images: productsImages.find(img => img.id === innerProduct.id).urls,
        category: categories.find(cat => cat.id === innerProduct.category_id)
    }
}
function addProductsToCategory(products, productsImages, category) {
    const categoryInner = { ...category, products: [] }
    products.map(p => {
        if (p.category_id === category.id) {
            categoryInner.products.push({
                id: p.id,
                name: p.name,
                slug: p.slug,
                price: p.price,
                // image: `https://source.unsplash.com/300x300/?${p.name}`,
                images: productsImages.find(img => img.id === p.id).urls
            })
        }
    })
    return categoryInner
}
function getBreadcrumbs(pageType, route, data) {
    const crumbs = []
    crumbs.push({
        title: 'Home',
        url: '/'
    })
    switch (pageType) {
        case 'category':
            crumbs.push({
                title: data.name,
                url: `/category/${data.slug}`
            })
            break
        case 'product':
            crumbs.push({
                title: data.category.name,
                url: `/category/${data.category.slug}`
            })
            crumbs.push({
                title: data.name,
                url: `/product/${data.slug}`
            })

            break

        default:
            break
    }
    crumbs[crumbs.length - 1].disabled = true; // disable last crumb
    return crumbs
}
export default { categories, sampleSize, getProductsByIds, getProduct, addProductsToCategory, getBreadcrumbs }
