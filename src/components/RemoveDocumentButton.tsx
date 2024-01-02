import RemoveButton from './RemoveButton'
import { RxDocument } from 'rxdb'

type RemoveDocumentButtonProps<T> = {
  document: RxDocument<T>
  title?: string
}

RemoveDocumentButton.defaultProps = {
  title: 'Remove document',
}

function RemoveDocumentButton<T>({
  document,
  title,
}: RemoveDocumentButtonProps<T>) {
  function removeDocument() {
    document.remove()
  }

  return <RemoveButton title={title} onClick={removeDocument} />
}

export default RemoveDocumentButton
