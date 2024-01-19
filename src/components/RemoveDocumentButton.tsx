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
  return <RemoveButton title={title} onClick={document.remove} />
}

export default RemoveDocumentButton
