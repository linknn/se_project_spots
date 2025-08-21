export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    console.log(`Setting text to ${loadingText}`);
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}
