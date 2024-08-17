// Array of group data
const groupData = [
    { title: "에델바이스", description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.", likes: "1.5K", badges: 2, memories: 8, date: "D+265", image: "../images/에델바이스.png" },
    { title: "에델바이스", description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.", likes: "1.5K", badges: 2, memories: 8, date: "D+265", image: "../images/에델바이스.png" },
    // Add more data here
];

// Load more functionality
let currentIndex = 0;
const loadMoreBtn = document.getElementById('loadMoreBtn');

function loadGroups() {
    const groupContainer = document.getElementById('groups');
    const endIndex = currentIndex + 4; // Load 4 groups at a time

    for (let i = currentIndex; i < endIndex && i < groupData.length; i++) {
        const group = groupData[i];
        const groupBlock = document.createElement('div');
        groupBlock.classList.add('group-block');

        groupBlock.innerHTML = `
            <img src="${group.image}" alt="${group.title}">
            <div class="group-info">
                <div class="title">${group.title}</div>
                <div class="description">${group.description}</div>
                <div class="meta">
                    <span>${group.date}</span> | <span>${group.likes} 공감</span>
                </div>
                <div class="badges">획득 배지: ${group.badges}</div>
                <div class="memories">추억: ${group.memories}</div>
            </div>
        `;

        groupContainer.appendChild(groupBlock);
    }

    currentIndex = endIndex;

    // Hide load more button if all groups are loaded
    if (currentIndex >= groupData.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Load initial groups
loadGroups();

// Add event listener for the load more button
loadMoreBtn.addEventListener('click', loadGroups);
