const router = require('express').Router()
const auth = require('../middleware/auth')
const Project = require('../models/project')



router.post('/:id/comments', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        project.comments.push(req.body);
        project.save(function (err) {
            res.redirect(`/projects/${project._id}`);
        });
    });
})
// route to post comments to projects
// router.post('/new', async (req, res) => {
//     Project.findById({
//         projectId: ''
//     })
//     // find projectId (make string)
//     // make call to it in database 

//     console.log(`🇸🇭`)
//     try {
//         const { entry } = req.body
        
//         const newComment = new Comment({
//             name: req.body.name,
//             entry: req.body.entry
//         })
//         const savedComment = await newComment.save()
//         res.json(savedComment)
//     } catch (err) {
//         res.status(500).json({ error: err.message})
//     }
// })

router.delete('/:id/comments/:commentId', (req, res) => {
    let commentIndex = Project.comments.findIndex(comment => comment._id == req.params.commentId)
    if(commentIndex === -1) {
        res.redirect('/projects')
    } else {
        Project.comments.splice(commentIndex, 1)
        Project.save(function (err) {
            if (err) return handleError(err);
            console.log('the comments were removed');
        });
    }

    // Project.findById(req.params.id, (err, project) => {
    //     project.comments.pop(req.body)
    //     project.save(function (err) {
    //         res. redirect(`/project/${project._id}`)
    //     })
    // })

    // const comment = await Comment.findOne({
    //     _id: req.params._id
    // })
    // if(!comment){
    //     return res.status(400).json({ msg: 'Cannot find the comment you want to delete'})
    // }
    // const deletedComment = await Comment.findByIdAndDelete(req.params.id)
    // res.json(deletedComment)
})

module.exports = router