// Sample group data for demonstration
const groupData = [
    { title: "달봉이네 가족", date: "D+265", likes: "1.5K", badges: 8, memories: 8, status: "비공개" },
    { title: "달봉이네 가족", date: "D+265", likes: "1.5K", badges: 8, memories: 8, status: "비공개" },
    // Add more sample data here...
];

// Initialize state
let currentIndex = 0;
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Function to load groups dynamically
function loadGroups() {
    const groupContainer = document.getElementById('groups');
    const endIndex = currentIndex + 4; // Load 4 groups at a time

    for (let i = currentIndex; i < endIndex && i < groupData.length; i++) {
        const group = groupData[i];
        const groupBlock = document.createElement('div');
        groupBlock.classList.add('group-block');

        groupBlock.innerHTML = `
            <div class="group-info">
                <div class="meta">
                    <span>${group.date}</span> | <span>${group.status}</span>
                </div>
                <div class="title">${group.title}</div>
                <div class="badges">획득 배지: ${group.badges}</div>
                <div class="memories">추억: ${group.memories}</div>
                <div class="likes">그룹 공감: ${group.likes}</div>
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

// Initial load of groups
loadGroups();

// Event listener for "더보기" button
loadMoreBtn.addEventListener('click', loadGroups);
