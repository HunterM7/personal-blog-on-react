import React from 'react'
import { Tab, Tabs, Grid } from '@mui/material'

// Redux
import { fetchPosts } from 'redux/slices/posts'
import { useAppDispatch, useAppSelector } from 'redux/store'

// Components
import { CommentsBlock, Post, PostSkeleton, TagsBlock } from 'components'
import { postsSelector } from 'redux/selectors/postsSelector'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(postsSelector)

  React.useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="Разделы статей">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts.items ? (
            posts.items.map(post => (
              <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={{
                  _id: post.user._id,
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  fullName: post.user.fullName,
                }}
                createdAt={'12 июня 2022 г.'}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable
              />
            ))
          ) : (
            <PostSkeleton />
          )}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock
            items={['react', 'typescript', 'заметки']}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  _id: 'dasdaskjdkalsdjkas',
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
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
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
