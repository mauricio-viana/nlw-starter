/*Bom dia, galera! compartilho abaixo meu linkedin e github caso alguém queira
fazer aquele networking! 

Bom dia, galera! segue meus contatos parar ampliar o networking.
https://www.linkedin.com/in/mauricio-viana
https://github.com/mauricio-viana */

const ufSelect = document.querySelector('[name=uf');
const citySelect = document.querySelector('[name=city]');
const inputState = document.querySelector('[name=state]');

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
  const indexOfSelectedState = event.target.selectedIndex;
  inputState.value = event.target.options[indexOfSelectedState].text;

  citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
  await itemsSelect(citySelect, res);
  citySelect.disabled = citySelect.length === 1;
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

populateUFs();
ufSelect.addEventListener('change', getCities);

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
