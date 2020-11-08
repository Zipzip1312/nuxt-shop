export default (req, res, next) => {
    res.setHeader(
        'cache-control',
        'public, max-age=31557600, s-maxage=86400'
    )

    next()
}
