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
