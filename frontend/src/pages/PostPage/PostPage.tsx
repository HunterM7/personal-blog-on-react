import React from 'react'
import { useParams } from 'react-router-dom'

// Utils
import { IPost } from 'types'
import axios from 'utils/axios'

// Components
import { AddComment, CommentsBlock, PostCard } from 'components'

const PostPage: React.FC = () => {
  const [post, setPost] = React.useState<IPost | null>(null)

  const { id } = useParams()

  React.useEffect(() => {
    id &&
      axios
        .get<IPost>(`posts/${id}`)
        .then(res => setPost(res.data))
        .catch((error: Error) => alert(`Что-то пошло не так: ${error.message}`))
  }, [id])

  return (
    <>
      <PostCard post={post} commentsCount={3} isFullPost isEditable={false} />

      <CommentsBlock
        items={[
          {
            user: {
              _id: 'dasdaskjdkalsdjkas',

              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              _id: 'dakjsdjasknjdkajkska',

              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  )
}

export default PostPage
