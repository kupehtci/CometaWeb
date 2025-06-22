
# COMETA - UI Theme

Cometa Framework's UI implementation is based on ImGUI. 

ImGUI allows access to the `style` class and the `colors` and other properties through the `ImGui::GetStyle()` function that retrieve its style class by reference. 

Cometa has a built-in theme in purple theme, inspired in purple shades theme that is implemented following this code: 

```cpp
ImGuiStyle* style = &ImGui::GetStyle();  
  
// Fonst assign  
float fontSize = 15.0f;  
  
io.Fonts->AddFontFromFileTTF("resources/Fonts/jetbrains/JetBrainsMonoNL-Regular.ttf", fontSize);  
io.FontDefault = io.Fonts->AddFontFromFileTTF("resources/Fonts/jetbrains/JetBrainsMonoNL-Regular.ttf", fontSize);  
  
auto &colors = ImGui::GetStyle().Colors;  
  
// Windows  
colors[ImGuiCol_WindowBg] = ImVec4{0.1f, 0.1f, 0.13f, 1.0f};  
colors[ImGuiCol_MenuBarBg] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
  
// Border  
colors[ImGuiCol_Border] = ImVec4{0.44f, 0.37f, 0.61f, 0.29f};  
colors[ImGuiCol_BorderShadow] = ImVec4{0.0f, 0.0f, 0.0f, 0.24f};  
  
// Text  
colors[ImGuiCol_Text] = ImVec4{1.0f, 1.0f, 1.0f, 1.0f};  
colors[ImGuiCol_TextDisabled] = ImVec4{0.5f, 0.5f, 0.5f, 1.0f};  
  
// Headers  
colors[ImGuiCol_Header] = ImVec4{0.13f, 0.13f, 0.17, 1.0f};  
colors[ImGuiCol_HeaderHovered] = ImVec4{0.19f, 0.2f, 0.25f, 1.0f};  
colors[ImGuiCol_HeaderActive] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
  
// Buttons  
colors[ImGuiCol_Button] = ImVec4{0.13f, 0.13f, 0.17, 1.0f};  
colors[ImGuiCol_ButtonHovered] = ImVec4{0.19f, 0.2f, 0.25f, 1.0f};  
colors[ImGuiCol_ButtonActive] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
colors[ImGuiCol_CheckMark] = ImVec4{0.74f, 0.58f, 0.98f, 1.0f};  
  
// Popups  
colors[ImGuiCol_PopupBg] = ImVec4{0.1f, 0.1f, 0.13f, 0.92f};  
  
// Slider  
colors[ImGuiCol_SliderGrab] = ImVec4{0.44f, 0.37f, 0.61f, 0.54f};  
colors[ImGuiCol_SliderGrabActive] = ImVec4{0.74f, 0.58f, 0.98f, 0.54f};  
  
// Frame BG  
colors[ImGuiCol_FrameBg] = ImVec4{0.13f, 0.13, 0.17, 1.0f};  
colors[ImGuiCol_FrameBgHovered] = ImVec4{0.19f, 0.2f, 0.25f, 1.0f};  
colors[ImGuiCol_FrameBgActive] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
  
// Tabs  
colors[ImGuiCol_Tab] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
colors[ImGuiCol_TabHovered] = ImVec4{0.24, 0.24f, 0.32f, 1.0f};  
colors[ImGuiCol_TabActive] = ImVec4{0.2f, 0.22f, 0.27f, 1.0f};  
colors[ImGuiCol_TabUnfocused] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
colors[ImGuiCol_TabUnfocusedActive] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
  
// Title  
colors[ImGuiCol_TitleBg] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
colors[ImGuiCol_TitleBgActive] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
colors[ImGuiCol_TitleBgCollapsed] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
  
// Scrollbar  
colors[ImGuiCol_ScrollbarBg] = ImVec4{0.1f, 0.1f, 0.13f, 1.0f};  
colors[ImGuiCol_ScrollbarGrab] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f};  
colors[ImGuiCol_ScrollbarGrabHovered] = ImVec4{0.19f, 0.2f, 0.25f, 1.0f};  
colors[ImGuiCol_ScrollbarGrabActive] = ImVec4{0.24f, 0.24f, 0.32f, 1.0f};  
  
// Seperator  
colors[ImGuiCol_Separator] = ImVec4{0.44f, 0.37f, 0.61f, 1.0f};  
colors[ImGuiCol_SeparatorHovered] = ImVec4{0.74f, 0.58f, 0.98f, 1.0f};  
colors[ImGuiCol_SeparatorActive] = ImVec4{0.84f, 0.58f, 1.0f, 1.0f};  
  
// Resize Grip  
colors[ImGuiCol_ResizeGrip] = ImVec4{0.44f, 0.37f, 0.61f, 0.29f};  
colors[ImGuiCol_ResizeGripHovered] = ImVec4{0.74f, 0.58f, 0.98f, 0.29f};  
colors[ImGuiCol_ResizeGripActive] = ImVec4{0.84f, 0.58f, 1.0f, 0.29f};  
  
// Docking  
colors[ImGuiCol_DockingPreview] = ImVec4{0.44f, 0.37f, 0.61f, 1.0f};  
  
style->TabRounding = 4;  
style->ScrollbarRounding = 9;  
style->WindowRounding = 7;  
style->GrabRounding = 3;  
style->FrameRounding = 3;  
style->PopupRounding = 4;  
style->ChildRounding = 4;
```

This are the following theme colours that can be customized: 
### Windows colors

The main window colors will affect the window background and the color of the menu bar: 

```cpp
colors[ImGuiCol_WindowBg] = ImVec4{0.1f, 0.1f, 0.13f, 1.0f}; // Dark gray-blue background
colors[ImGuiCol_MenuBarBg] = ImVec4{0.16f, 0.16f, 0.21f, 1.0f}; // Slightly lighter than window
```

### Border settings

Borders are coloured by defining the border color and the border shadow: 
```cpp
colors[ImGuiCol_Border] = ImVec4{0.44f, 0.37f, 0.61f, 0.29f}; 
colors[ImGuiCol_BorderShadow] = ImVec4{0.0f, 0.0f, 0.0f, 0.24f}; 
```

The rounding of the borders its editable through the following properties: 
```cpp 
style->TabRounding = 4;
style->ScrollbarRounding = 9;
style->WindowRounding = 7;
style->GrabRounding = 3;
style->FrameRounding = 3;
style->PopupRounding = 4;
style->ChildRounding = 4;
```