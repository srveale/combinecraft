import { useState } from 'react'
import './App.css'
import AvailableItems from './items/available-items'
import { fetchNewItem, fetchImage } from './actions/actions'

const defaultItems = [
  { text: 'A stick' },
  { text: 'A hatchet' },
  { text: 'A rock' },
  { text: 'A piece of string' },
  { text: 'A handful of paperclips' },
  { text: 'A mirror' },
  { text: 'A packet of seeds' },
  { text: 'A small, ornate box' },
  { text: 'A pair of scissors' },
  { text: 'Aluminum foil' },
  { text: 'A working radio' }
]

const weirdModeItems = [
  { text: 'A magic wand' },
  { text: 'Chaos' },
  { text: 'Time' },
  { text: 'Dreams' },
]

function App() {
  const [items, setItems] = useState(defaultItems)
  const [itemLoading, setItemLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState([] as string[])
  const [img, setImg] = useState('' as string)
  const [imageLoading, setImageLoading] = useState(false)
  const [weirdMode, setWeirdMode] = useState(false)
  const [openAIKey, setOpenAIKey] = useState('' as string)
  const [openAIKeySubmitted, setOpenAIKeySubmitted] = useState(false)

  const onFetchItemsClick = async () => {
    setItemLoading(true)
    const newItem = await fetchNewItem(selectedItems, openAIKey)
    if (newItem && newItem.text) {
      setItems([...items, newItem])
    }
    setItemLoading(false)
  }

  const onFetchImageClick = async () => {
    setImageLoading(true)
    const image = await fetchImage(selectedItems, openAIKey)
    if (image && image.length > 0) {
      setImg(image)
    }
    setImageLoading(false)
  }

  const selectItem = (text: string) => {
    const newItems = selectedItems.includes(text)
      ? selectedItems.filter((item) => item !== text)
      : [...selectedItems, text]
    if (newItems.length > 4) {
      newItems.shift()
    }
    setSelectedItems(newItems)
  }

  return (
    <>
    {!openAIKeySubmitted && (
      <>
      <input
        type="text"
        placeholder="Enter OpenAI Key"
        onChange={(e) => setOpenAIKey(e.target.value)}
        className="openAIKeyInput"
      />
      <br />
      <button 
        onClick={() => setOpenAIKeySubmitted(true)} 
        className="fetchItemButton"
      >
        Submit
      </button>
      <br />
      <br />
      </>
    )}
      <AvailableItems items={weirdMode ? [...items, ...weirdModeItems]: items} selectedItems={selectedItems} selectItem={selectItem}/>
      <br />
      <br />
      <button 
        onClick={onFetchItemsClick} 
        className={itemLoading ? "fetchItemButtonDisabled" : "fetchItemButton"} 
        disabled={itemLoading}
      >
        Craft new item
      </button>
      <br />
      <button 
        onClick={onFetchImageClick} 
        className={imageLoading ? "fetchImageButtonDisabled" : "fetchImageButton"}
      >
        Create image of selected items (costs 4 cents)
      </button>
      <br />
      <button 
        onClick={() => setWeirdMode(!weirdMode)} 
        className="weirdModeButton"
      >
        Weird Mode?
      </button>
      {img && (
      <>
        <h2>Behold! Your achievement:</h2>
        <img src={img} alt="Generated image" style={{ maxWidth: '100%' }} />
      </>)}
    </>
  )
}

export default App
