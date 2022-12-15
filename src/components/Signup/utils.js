export function formToObject(form) {
  const formData = {};

  for (let i = 0; i < form.length; i++) {
    formData[form[i].name] = form[i].value;
  }

  return formData;
}
