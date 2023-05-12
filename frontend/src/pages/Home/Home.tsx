import React from 'react'
import { Tab, Tabs, Grid } from '@mui/material'

// Components
import { CommentsBlock, Post, TagsBlock } from 'components'

const Home: React.FC = () => {
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {[...Array(5)].map((_, i) => (
            <Post
              key={i}
              _id={i}
              title="Roast the code #1 | Rock Paper Scissors"
              imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={{
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                fullName: 'Keff',
              }}
              createdAt={'12 июня 2022 г.'}
              viewsCount={150}
              commentsCount={3}
              tags={['react', 'fun', 'typescript']}
              isEditable
              isFullPost={false}
              isLoading={false}
            />
          ))}
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
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={true}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
