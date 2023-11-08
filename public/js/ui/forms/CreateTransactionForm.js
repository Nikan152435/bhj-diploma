const Account = require('./Account');
const Transaction = require('./Transaction');

class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    const accountsList = this.element.querySelector(".accounts-select");
    Account.list(User.current(), (err, response) => {
      if (response && response.data) {
        accountsList.innerHTML = "";
        response.data.forEach((account) => {
          const option = document.createElement("option");
          option.value = account.id;
          option.textContent = account.name;
          accountsList.appendChild(option);
        });
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        const modal = this.element.closest(".modal");
        if (modal) {
          const modalObject = App.getModal(modal.dataset.modalId);
          modalObject.close();
        }
        App.update();
      }
    });
  }
}
