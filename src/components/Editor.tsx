import { useRef,useState,useEffect } from 'react';
import { Appearance, defineOptions, ink, Instance, } from 'ink-mde';

type Props = {
  content: string | null
  onChange: (content: string) => void
}

const Editor = ({content,onChange}: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [editor, setEditor] = useState<Instance | null>(null)
    const [text,setText] = useState<String>("")
    const options = defineOptions({
      doc: content || undefined,
      files: {
        clipboard: true
      },
      hooks: {
        afterUpdate: (doc: string) => {
          setText(doc);
          onChange(doc);
        },
      },
      interface: {
        appearance: Appearance.Light,
        attribution: false,
        toolbar: true,
        lists: true,
      },
    })
  
    useEffect(() => {
      if (ref.current && ref.current.children.length <= 0) {
        const editor = ink(ref.current, options)
        setEditor(editor)
      }
    }, [ref])
  
    useEffect(() => {
      if (editor) {
        editor.reconfigure(options)
      }
    }, [options])

  return (
    <div className="border-2 border-black rounded m-auto w-[80vw]" ref={ref}></div>
  )
}


export default Editor;