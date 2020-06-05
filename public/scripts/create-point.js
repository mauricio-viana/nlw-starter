const ufSelect = document.querySelector('[name=ufSelect');
const citySelect = document.querySelector('[name=citySelect]');
const inputState = document.querySelector('[name=state]');
const inputCity = document.querySelector('[name=city]');

async function populateUFs() {
  const res = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  );

  itemsSelect(ufSelect, res);
}

async function getCities(event) {
  const uf = event.target.value;
  const res = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );

  citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
  await itemsSelect(citySelect, res);
  citySelect.disabled = citySelect.length === 1;
  descptionItemSelected(event, inputState);
}

async function itemsSelect(select, url) {
  const json = await url.json();

  json
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((obj) => {
      const { id, nome } = obj;
      select.innerHTML += `<option value="${id}">${nome}</option>`;
    }, 0);
}

function getCity(event) {
  descptionItemSelected(event, inputCity);
}

function descptionItemSelected(event, targetInput) {
  const indexOfSelectedState = event.target.selectedIndex;
  targetInput.value = event.target.options[indexOfSelectedState].text;
}

populateUFs();
ufSelect.addEventListener('change', getCities);
citySelect.addEventListener('change', getCity);

//itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li');
for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('[name=items]');
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  const itemId = event.target.dataset.id;

  itemLi.classList.toggle('selected');

  const alreadeSelected = selectedItems.indexOf(itemId);

  if (alreadeSelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      return item != itemId;
    });
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }
  collectedItems.value = selectedItems;
}
