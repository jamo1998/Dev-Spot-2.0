const router = require('express').Router()
const auth = require('../middleware/auth')
const Project = require('../models/project')


// route for posting comments on a specific project
router.post('/:id/comments', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        project.comments.push(req.body);
        project.save(function (err) {
            res.redirect(`/projects/${project._id}`);
        });
    });
})

// // route for deleting specific comments on specific projects
// router.delete('/:id/comments/:commentId', (req, res) => {
//     let projectComments = Project.findById(req.params._id)
//     console.log(projectComments)
//     console.log(projectComments.comments)
//     let commentIndex = Project.comments.findIndex(comments => comments._id == req.params.commentId)
//     if(commentIndex === -1) {
//         res.redirect('/projects')
//     } else {
//         Project.comments.splice(commentIndex, 1)
//         Project.save(function (err) {
//             if (err) return handleError(err);
//             console.log('the comments were removed');
//         });
//     }
// })

module.exports = router