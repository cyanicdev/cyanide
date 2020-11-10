import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Dialogs 1.2
import cyanic.ide 1.0

Item {
    id: root
    property alias text: textArea.text
    property alias textArea: textArea
    property string title: changedSinceLastSave ? fileName+"*" : fileName
    property alias fileName: backend.fileName
    property bool changedSinceLastSave: false
    property bool isUnsavedFile: true

    function open(fileUrl) {
        backend.fileUrl = fileUrl
        backend.load()
        textArea.text = backend.text
        isUnsavedFile = false
        changedSinceLastSave = false
    }

    function save(cb) {
        backend.text = textArea.text
        if(fileName === "untitled") {
            fileDialogSave.cb = function() {
                save(cb)
                fileDialogSave.cb = undefined
            }
            fileDialogSave.visible = true
        } else {
            if(backend.save()) {
                changedSinceLastSave = false
                isUnsavedFile = false
                if(cb != undefined) cb()
            }
        }
    }

    function saveAs() {
        backend.text = textArea.text
        fileDialogSave.cb = function() {
            save()
            fileDialogSave.cb = undefined
        }
        fileDialogSave.visible = true
    }

    CodeEditorBackend {
        id: backend
        fileName: "untitled"
    }

    Flickable {
        id: flickableItem
        anchors.fill: parent
        flickableDirection: Flickable.VerticalFlick

        LineNumbers {
            id: lineNumbers
            height: parent.height
            width: 40
        }

        TextArea.flickable: TextArea {
            id: textArea
            height: parent.height
            width: parent.width-lineNumbers.width
            anchors.left: lineNumbers.right
            wrapMode: TextEdit.NoWrap
            selectByMouse: true

            font.family: "Consolas"
            font.pointSize: 10

            function update() {
                var lineHeight = 15;
                lineNumbers.lineCount = lineCount
                lineNumbers.lineHeight = lineHeight
                lineNumbers.cursorPosition = cursorPosition
                lineNumbers.selectionStart = selectionStart
                lineNumbers.selectionEnd = selectionEnd
                lineNumbers.text = text
                lineNumbers.update()
            }

            Component.onCompleted: {
                flickableItem.contentYChanged.connect(update)
                update()
            }

            onTextChanged: {
                changedSinceLastSave = true
            }

            onLineCountChanged: update()
            onHeightChanged: update()
            onCursorPositionChanged: update()
        }

        ScrollBar.vertical: ScrollBar {}
    }

    FileDialog {
        id: fileDialogSave
        selectExisting : false
        property var cb
        title: "Please choose a location to save"

        onAccepted: {
            backend.fileUrl = fileDialogSave.fileUrl
            if(cb != undefined) {
                cb()
                cb = null
            }
        }
    }

    FileDialog {
        id: fileDialogLoad
        selectExisting : true
        property var cb
        title: "Please choose a file"

        onAccepted: {
            backend.fileUrl = fileDialogSave.fileUrl
            if(cb != undefined) {
                cb()
                cancelCloseEditor = false
                cb = null
            }
        }
        onRejected: {
            cancelCloseEditor = true
            cb = null
        }
    }
}
