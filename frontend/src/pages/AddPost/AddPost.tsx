import React from 'react'
import { Link } from 'react-router-dom'
import EasyMDE from 'easymde'
import SimpleMDE from 'react-simplemde-editor'
import { TextField, Paper, Button } from '@mui/material'

// Utils
import { BASE_URL } from 'utils/routes'

// Styles
import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'

const AddPost: React.FC = () => {
  const imageUrl = '/'
  const [value, setValue] = React.useState('')

  const handleChangeFile = () => {
    console.log('test')
  }

  const onClickRemoveImage = () => {
    console.log('test')
  }

  const onChange = (value: string) => {
    setValue(value)
  }

  const options = React.useMemo<EasyMDE.Options>(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        uniqueId: crypto.randomUUID(),
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  )

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to={BASE_URL}>
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  )
}

export default AddPost
