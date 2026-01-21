function submitForm(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura os dados do formulário
  const form = document.getElementById("registrationForm");
  const formData = new FormData(form);

  // Converte os dados do formulário em JSON
  const jsonData = {};
  formData.forEach((value, key) => (jsonData[key] = value));

  // Envia os dados como JSON usando fetch
  fetch("http://localhost:8080/employ/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Cadastro realizado com sucesso");
        window.location.href = "success.html";
      } else {
        console.error("Erro ao cadastrar");
      }
    })
    .catch((error) => console.error("Erro:", error));
}
