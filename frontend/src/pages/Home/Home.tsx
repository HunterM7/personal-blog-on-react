import React from 'react'
import { Tab, Tabs, Grid } from '@mui/material'

// Redux
import { fetchPosts, fetchTags } from 'redux/slices/posts'
import { useAppDispatch, useAppSelector } from 'redux/store'

// Components
import { CommentsBlock, PostCard, PostSkeleton, TagsBlock } from 'components'
import { postsSelector } from 'redux/selectors/postsSelector'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { posts, tags } = useAppSelector(postsSelector)

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
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
              <PostCard
                post={post}
                key={post._id}
                commentsCount={3}
                isEditable
              />
            ))
          ) : (
            <PostSkeleton />
          )}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} />

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
