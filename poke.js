async function fetchPokeData(query) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!response.ok) throw new Error("Pokemon not found");
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pokeForm");
    const pokeInfo = document.getElementById("poke-info");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const name = document.getElementById("pokeName").value.trim();
      const id = document.getElementById("pokeId").value.trim();
      const query = name || id;
  
      if (!query) {
        pokeInfo.innerHTML = `<p class="text-danger">Please enter a Pokemon name or ID.</p>`;
        return;
      }
  
      const data = await fetchPokeData(query);
  
      if (!data) {
        pokeInfo.innerHTML = `<p class="text-danger">No Pokemon found. Try again!</p>`;
        return;
      }
  
      pokeInfo.innerHTML = `
        <h2 class="text-capitalize">${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}"/>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
      `;
    });
  });
  