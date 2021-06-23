import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [numbers] = useState(['5566996859818', '5566999435043', '5566999228007'])
  const [lastClickedIndex, setLastClickedIndex] = useState()

  useEffect(() => {
    const data = localStorage.getItem('@whatsappnumber')
    if (data && parseInt(data) >= numbers.length) {
      localStorage.removeItem('@whatsappnumber')
    }
  }, [])

  const handleClick = () => {
    const data = localStorage.getItem('@whatsappnumber')
    if (data) {
      const parsedData = parseInt(data)
      const newIndex = parsedData + 1 === numbers.length ? 0 : parsedData + 1
      setLastClickedIndex(newIndex)
      const url = `//api.whatsapp.com/send?phone=${numbers[newIndex]}`
      window.open(url, '_blank').focus();
      localStorage.setItem('@whatsappnumber', newIndex.toString())
    } else {
      localStorage.setItem('@whatsappnumber', '0')
      setLastClickedIndex(0)
      const url = `//api.whatsapp.com/send?phone=${numbers[0]}`
      window.open(url, '_blank').focus();
    }
  }
  return (
    <div className={styles.container}>
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  )
}
