// Models
import PostModel from '../models/Post.js'

export async function createPost(req, res) {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    })

    const post = await doc.save()

    res.status(200).json(post)
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Не удалось создать статью' })
  }
}
