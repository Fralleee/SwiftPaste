import { useEffect, useCallback, useContext } from "react"
import SuggestionsContext from "../context/SuggestionsContext"

function useBeforeUnload() {
  const { isFormDirty } = useContext(SuggestionsContext)
  const handleBeforeUnload = useCallback(
    event => {
      if (isFormDirty) {
        event.preventDefault()
        event.returnValue = "" // Needed for Chrome
      }
    },
    [isFormDirty]
  )

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [handleBeforeUnload])
}

export default useBeforeUnload
