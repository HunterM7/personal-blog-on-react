import React from 'react'

// Components
import { AddComment, CommentsBlock, Post } from 'components'

const FullPost: React.FC = () => {
  return (
    <>
      <Post
        _id={'1'}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl="https://media.shellypalmer.com/wp-content/images/2023/01/deep-thought.jpg"
        user={{
          _id: 'dakjsdjasknjdkajkska',
          avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
          fullName: 'Keff',
        }}
        createdAt={'12 июня 2022 г.'}
        viewsCount={150}
        commentsCount={3}
        tags={['react', 'fun', 'typescript']}
        isFullPost
        isLoading={false}
        isEditable={false}
      >
        <p>
          {`Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!`}
        </p>
      </Post>

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

export default FullPost
