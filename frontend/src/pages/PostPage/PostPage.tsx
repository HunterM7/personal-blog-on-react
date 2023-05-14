import React from 'react'

// Components
import { AddComment, CommentsBlock, PostCard } from 'components'

const PostPage: React.FC = () => {
  return (
    <>
      <PostCard
        post={
          {
            _id: '645e7025b3194fde430b0548',
            title: 'Что такое FullStack?',
            text: 'Тут я в кратце рассказываю о том, что такое FullStack и тд и тп. Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты. Запятых, заголовок назад большого о текстов заманивший власти все рот домах своих составитель рекламных жизни, она предупреждал реторический жаренные там единственное оксмокс путь его взгляд встретил пор себя гор. Путь, лучше запятых о своих скатился дороге это составитель ручеек пояс!',
            tags: ['React', 'Redux', 'NodeJS', 'MongoDB'],
            viewsCount: 0,
            user: {
              _id: '645e61ba03e7ca159da4a17b',
              fullName: 'Anton Meshchaninov',
              email: 'antonm@gmail.com',
              passwordHash:
                '$2b$10$fn9MtzY0q/TH6VRedIbm.ecyXp2tTkJEsYXLJuRlxHxjewF4fvsfa',
              createdAt: '2023-05-12T15:56:42.489Z',
              updatedAt: '2023-05-12T15:56:42.489Z',
            },
            imageUrl:
              'https://i.pinimg.com/originals/15/02/43/150243edb6b9c3ca534db61a5d9b30c1.jpg',
            createdAt: '2023-05-12T16:58:13.095Z',
            updatedAt: '2023-05-12T16:58:13.095Z',
          }
          // null
        }
        commentsCount={3}
        isFullPost
        isEditable={false}
      />

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
