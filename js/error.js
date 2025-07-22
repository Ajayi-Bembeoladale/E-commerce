showMessage(text, backgroundColor);{
    this.msgBox.textContent = text;
    this.msgBox.style.backgroundColor = backgroundColor;
    this.msgBox.style.color = "#fff";
    this.msgBox.style.padding = "10px 15px";
    this.msgBox.style.borderRadius = "5px";
    this.msgBox.style.fontWeight = "bold";
    this.msgBox.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
    this.msgBox.style.marginTop = "20px";
    this.msgBox.style.transition = "all 0.3s ease";
    this.msgBox.style.animation = backgroundColor === "green" ? "animateSuccessful 0.5s" : "animateUnsucessful 0.5s";

    this.msgBox.classList.add("show");

    if (this.msgTimeout) clearTimeout(this.msgTimeout);
    this.msgTimeout = setTimeout(() => {
      this.msgBox.textContent = "";
      this.msgBox.style.backgroundColor = "";
      this.msgBox.classList.remove("show");
    }, 2000);
  }
