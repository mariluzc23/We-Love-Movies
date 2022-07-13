const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reviews.service")


async function reviewExists(req, res, next) {
    const review = await service.find(req.params.reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    next({
        status: 404,
        message: "Review cannot be found"
    })
}

/**
 * Throw an error if the user gives a piece of data within body that's not either a content or a score
 */

const VALID_PROPERTIES = [
    "score",
    "content"
]

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }


async function update(req, res, next) {
    const { review } = res.locals
    const updatedData = req.body.data
    const newReview = {
        ...review,
        ...updatedData
    }
    await service.update(newReview) // this responds with just a number, so pass in newReview instead
    res.json({ data: newReview })
}

async function destroy(req, res, next) {
    await service.delete(req.params.reviewId)
    res.sendStatus(204)
}

function read(req, res, next) {
    res.json({ data: res.locals.review })
}


module.exports = {
    update: [asyncErrorBoundary(reviewExists), hasOnlyValidProperties, asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)]
}