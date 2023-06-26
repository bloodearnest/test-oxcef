import { effect } from "@preact/signals";
import { reviewUrl } from "./_data";
import { approvedFiles } from "./_signals";

const formSetup = () => {
  const form = document.querySelector("#approveForm");
  const button = form.querySelector(`button[type="submit"]`);
  const counter = button.querySelector("#approved_count");
  form.action = reviewUrl;

  const enabledClasses = [
    "bg-blue-600",
    "text-white",
    "hover:bg-blue-700",
    "focus:bg-blue-700",
    "focus:ring-blue-500",
    "focus:ring-offset-white",
  ];

  const disabledClasses = [
    "cursor-not-allowed",
    "bg-slate-300",
    "text-slate-800",
  ];

  const setButtonState = (enabled) => {
    if (enabled) {
      if (button.disabled) {
        button.classList.remove(...disabledClasses);
        button.classList.add(...enabledClasses);
        button.disabled = false;
      }
    } else {
      button.classList.remove(...enabledClasses);
      button.classList.add(...disabledClasses);
      button.disabled = true;
    }
  };

  effect(() => {
    const count = approvedFiles.value.length;
    counter.textContent = `(${count} file${count === 1 ? "" : "s"})`;
    setButtonState(count > 0);
  });

  form.addEventListener("formdata", (ev) => {
    approvedFiles.value.forEach((output) =>
      ev.formData.append("outputs", output)
    );
  });
};

export default formSetup;
