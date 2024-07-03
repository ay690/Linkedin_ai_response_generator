import AiIcon from "assets/AI.svg"
import cssText from "data-text:~style.css"
//@ts-ignore
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"

import Modal from "~features/Modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Content = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const textBox = document.querySelector(".msg-form__contenteditable")
      if (textBox) {
        textBox.addEventListener("focus", handleFocus)
        textBox.addEventListener("blur", handleBlur)
        clearInterval(intervalId) // Stop checking once the class is found
      }
    }, 1000) // Check every second

    return () => clearInterval(intervalId) // Clean up on unmount
  }, [])

  const handleFocus = () => {
    const textBox = document.querySelector(".msg-form__contenteditable")
    const existingIcon = textBox?.querySelector(".ai-icon")
    if (!existingIcon) {
      const container = document.createElement("div")
      container.className = "ai-icon"
      container.style.position = "absolute"
      container.style.bottom = "0"
      container.style.right = "2rem"
      container.style.zIndex = "1000" // Ensure it is above other elements

      const imgElement = document.createElement("img")
      imgElement.src = AiIcon
      imgElement.alt = "ai-icon"
      imgElement.style.width = "32px"
      imgElement.style.height = "32px"
      imgElement.style.cursor = "pointer"
      imgElement.addEventListener("click", () => {
        setShowModal(true)
      })

      container.appendChild(imgElement)
      textBox?.appendChild(container)
    }
  }

  const handleBlur = () => {
    const textBox = document.querySelector(".msg-form__contenteditable")
    const container = textBox?.querySelector(".ai-icon")
    container?.remove()
  }

  return (
    <div>
      <Modal open={showModal} handleClose={() => setShowModal(false)} />
    </div>
  )
}

export default Content;
