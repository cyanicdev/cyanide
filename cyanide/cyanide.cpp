#include "sciter-x-window.hpp"

class frame : public sciter::window {
public:
	frame() : window(SW_TITLEBAR | SW_RESIZEABLE | SW_CONTROLS | SW_MAIN | SW_ENABLE_DEBUG) {}
	BEGIN_FUNCTION_MAP
		FUNCTION_0("nativeMessage", nativeMessage);
	END_FUNCTION_MAP
	sciter::string  nativeMessage() { return WSTR("Hello World"); }
};

#include "resources.cpp"

int uimain(std::function<int()> run) 
{
	SciterSetOption(NULL, SCITER_SET_SCRIPT_RUNTIME_FEATURES, ALLOW_FILE_IO | ALLOW_SOCKET_IO | ALLOW_EVAL | ALLOW_SYSINFO);

	sciter::archive::instance().open(aux::elements_of(resources));

	aux::asset_ptr<frame> pwin = new frame();

	pwin->load(WSTR("this://app/main.htm"));

	pwin->expand();

	return run();
}