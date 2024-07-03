import InsertIcon from "assets/Insert.svg"
import RegenerateIcon from "assets/Regenerate.svg"
import VectorIcon from "assets/Vector.svg"
import React, { useState } from "react"

interface IPrompts {
  role: string
  message: string
}

const PromptModal = ({
  open,
  handleClose
}: {
  open: boolean
  handleClose: () => void
}) => {
  const [prompts, setPrompts] = useState<IPrompts[]>([])
  const [userPrompt, setUserPrompt] = useState<string>("")

  const handleGenerate = () => {
    if (userPrompt && userPrompt?.length > 0) {
      const data = [
        {
          role: "user",
          message: userPrompt
        },
        {
          role: "system",
          message:
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
        }
      ]
      setPrompts((prev) => [...prev, ...data])
    }
    setUserPrompt("")
  }

  const handleInsert = () => {
    const placeHolder = document.querySelector(".msg-form__placeholder")
    placeHolder?.remove()
    const textBox = document.querySelector(".msg-form__contenteditable")
    if (textBox) {
      textBox.textContent = prompts[prompts.length - 1]?.message
      const range = document.createRange()
      range.selectNodeContents(textBox)
      range.collapse(false)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
    setUserPrompt("")
    setPrompts([])
    handleClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute flex flex-col p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl top-1/2 left-1/2 w-[400px] ">
        {prompts.length > 0 &&
          prompts.map((prompt, index) => (
            <div
              key={index}
              className={`text-lg text-wrap font-normal text-gray-700 ${prompt.role === "user" ? "self-end bg-gray-200" : "self-start bg-blue-100"} p-2 mb-2 rounded-lg`}>
              {prompt.message}
            </div>
          ))}
        <input
          type="text"
          placeholder="Your prompt"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="w-full p-2 mb-2 text-sm border rounded-md"
        />
        {prompts.length === 0 ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerate}
              className="flex items-center justify-center p-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded-md cursor-pointer w-28">
              <img src={VectorIcon} alt="icon" className="w-4 h-4 mr-2" />
              <span className="text-center">Generate</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleInsert}
              className="flex items-center justify-center w-20 p-2 mt-4 mr-2 text-sm font-semibold text-gray-700 border-2 border-gray-700 rounded-md cursor-pointer">
              <img src={InsertIcon} alt="icon" className="w-4 h-4 mr-1.5" />
              <span>Insert</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center p-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded-md cursor-pointer w-28">
              <img src={RegenerateIcon} alt="icon" className="w-4 h-4 mr-1.5" />
              <span>Regenerate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PromptModal
