#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickWindow>
#include <QFontDatabase>

#include "linenumbers.h"
#include "codeeditorbackend.h"

int main(int argc, char *argv[])
{
    QGuiApplication::setApplicationName("Cyanide");
    QGuiApplication::setOrganizationName("Cyanic");
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    QQuickWindow::setTextRenderType(QQuickWindow::NativeTextRendering);

    QGuiApplication app(argc, argv);

    QFontDatabase fontDatabase;
    if (fontDatabase.addApplicationFont(":/fonts/fontello.ttf") == -1)
        qWarning() << "Failed to load fontello.ttf";

    qmlRegisterType<LineNumbers>("cyanic.ide", 1, 0, "LineNumbers");
    qmlRegisterType<CodeEditorBackend>("cyanic.ide", 1, 0, "CodeEditorBackend");

    QQmlApplicationEngine engine;

    engine.load(QUrl(QStringLiteral("qrc:/main.qml")));
    if (engine.rootObjects().isEmpty())
        return -1;

    return app.exec();
}
