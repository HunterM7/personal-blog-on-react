// Models
import PostModel from '../models/Post.js'

// Get one post
export async function getOne(req, res) {
  try {
    const postId = req.params.id

    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $inc: { viewsCount: 1 },
      },
      { returnDocument: 'after' },
    )

    if (!post) {
      return res.status(404).json({ message: 'Такой статьи не существует' })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить статью' })
  }
}

// Get all posts
export async function getAll(req, res) {
  try {
    const posts = await PostModel.find().populate('user').exec()

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить статьи' })
  }
}

// Update post
export async function update(req, res) {
  try {
    const postId = req.params.id

    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
      { returnDocument: 'after' },
    )

    if (!post)
      return res.status(404).json({ message: 'Не удалось найти статью' })

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json('Не удалось обновить статью')
  }
}

// Delete post
export async function remove(req, res) {
  try {
    const postId = req.params.id

    const post = await PostModel.findByIdAndDelete(postId)

    if (!post) return res.status(404).json({ message: 'Статья не найдена' })

    res.status(200).json({ message: 'Статья успешно удалена' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить статью' })
  }
}

// Create post
export async function create(req, res) {
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
    res.status(500).json({ message: 'Не удалось создать статью' })
  }
}
