import QtQuick 2.15
import QtQuick.Controls 2.15
import Qt.labs.platform 1.0
import cyanic.ide 1.0

ApplicationWindow {
    width: 1280
    height: 720
    visible: true
    title: qsTr("Cyanide")

    MenuBar {
        id: menuBar

        Menu {
            title: qsTr("&File")
            MenuItem {
                text: qsTr("&New...")
            }
            MenuItem {
                text: qsTr("&Open...")
            }
            MenuItem {
                text: qsTr("&Save")
            }
            MenuItem {
                text: qsTr("Save &As...")
            }
            MenuSeparator {}
            MenuItem {
                text: qsTr("&Exit")
            }
        }
        Menu {
            title: qsTr("&Edit")
            MenuItem {
                text: qsTr("Cu&t")
            }
            MenuItem {
                text: qsTr("&Copy")
            }
            MenuItem {
                text: qsTr("&Paste")
            }
        }
        Menu {
            title: qsTr("&Help")
            MenuItem {
                text: qsTr("&About")
            }
        }
    }

    header: ToolBar {
        leftPadding: 8

        Flow {
            id: flow
            width: parent.width

            Row {
                id: fileRow
                ToolButton {
                    id: openButton
                    text: "\uF115" // icon-folder-open-empty
                    font.family: "fontello"
                    onClicked: openDialog.open()
                }
                ToolSeparator {
                    contentItem.visible: fileRow.y === editRow.y
                }
            }

            Row {
                id: editRow
                ToolButton {
                    id: copyButton
                    text: "\uF0C5" // icon-docs
                    font.family: "fontello"
                    focusPolicy: Qt.TabFocus
                }
                ToolButton {
                    id: cutButton
                    text: "\uE802" // icon-scissors
                    font.family: "fontello"
                    focusPolicy: Qt.TabFocus
                }
                ToolButton {
                    id: pasteButton
                    text: "\uF0EA" // icon-paste
                    font.family: "fontello"
                    focusPolicy: Qt.TabFocus
                }
            }
        }
    }

    SplitView {
        anchors.fill: parent
        orientation: Qt.Horizontal

        Rectangle {
            implicitWidth: 300
            Label {
                text: "File browser"
                anchors.centerIn: parent
            }
        }
        Rectangle {
            id: centerItem
            SplitView.minimumWidth: 400
            SplitView.fillWidth: true
            CodeEditorWindow {
                anchors.fill: parent
            }
        }
    }
}
