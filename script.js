
 
      // Candidate data for each category with logo images
      const candidates = {
        'head-boy': [
          { name: "Aalokik Dingwani", logo: "Student Election Council 2025/5.png" },
          { name: "Ved Desai", logo: "Student Election Council 2025/4.png" },
        
        ],
        'head-girl': [
          { name: "Jahanvi Balar", logo: "Student Election Council 2025/1.png" },
          { name: "Riddhi Soni", logo: "Student Election Council 2025/3.png" },
          { name: "Astha Shyani", logo: "Student Election Council 2025/2.png" }
        ],
        'green-house-male': [
          { name: "Dharm Songara", logo: "Student Election Council 2025/11.png" },
          { name: "Harsh Vanani", logo: "Student Election Council 2025/17.png" },
          { name: "Taksh Khunt", logo: "Student Election Council 2025/14.png" },
          { name: "Ansh Usdadiya", logo: "Student Election Council 2025/13.png" }
        ],
        'green-house-female': [
          { name: "Priyangi Patel", logo: "Student Election Council 2025/15.png" },
          { name: "Angel Hirpara", logo: "Student Election Council 2025/12.png" },
          { name: "Pal Koladiya", logo: "Student Election Council 2025/16.png" }
        ],
        'yellow-house-male': [
          { name: "Aksh Ramani", logo: "Student Election Council 2025/31.png" },
          { name: "Jenil Kathiriya", logo: "Student Election Council 2025/29.png" },
          { name: "Kanishk Jasani", logo: "Student Election Council 2025/27.png" },
          { name: "Kirtipal Singh", logo: "Student Election Council 2025/26.png" }
        ],
        'yellow-house-female': [
          { name: "Nirva Vekariya", logo: "Student Election Council 2025/30.png" },
          { name: "Dhyana Patel", logo: "Student Election Council 2025/32.png" },
          { name: "Dhyani Bhayani", logo: "Student Election Council 2025/28.png" }
        ],
        'red-house-male': [
          { name: "Priyansh Bhesaniya", logo: "Student Election Council 2025/6.png" },
          { name: "Dhyey Savaliya", logo: "Student Election Council 2025/7.png" },
          { name: "Dwij Patel", logo: "Logo.png" },
          { name: "Hem Patel", logo: "Student Election Council 2025/8.png" }
        ],
        'red-house-female': [
          { name: "Dhwani Vaghasiya", logo: "Student Election Council 2025/10.png" },
          { name: "Yasheeka Poojari", logo: "Student Election Council 2025/9.png" },
          { name: "Sakshi Tiwari", logo: "Logo.png" }
        ],
        'blue-house-male': [
          { name: "Ansh Barnwal", logo: "Student Election Council 2025/23.png" },
          { name: "Dev Goyani", logo: "Student Election Council 2025/20.png" },
          { name: "Aaditiya Shah", logo: "Student Election Council 2025/22.png" },
          { name: "Dhyey Patel", logo: "Student Election Council 2025/18.png" }
        ],
        'blue-house-female': [
          { name: "Tannu Tiwari", logo: "Student Election Council 2025/25.png" },
          { name: "Dhruvi Meghani", logo: "Student Election Council 2025/19.png" },
          { name: "Soumya Bhesaniya", logo: "Student Election Council 2025/24.png" },
          { name: "Devi Pandya", logo: "Student Election Council 2025/21.png" }
        ]
      };

      const homeView = document.getElementById('home-view');
      const candidateView = document.getElementById('candidate-view');
      const candidateListEl = document.getElementById('candidates-list');
      const candidateCategoryTitle = document.getElementById('candidate-category-title');
      const thankYouMessage = document.getElementById('thank-you-message');

      const resultsView = document.getElementById('results-view');
      const resultsList = document.getElementById('results-list');
      const resultsBackBtn = document.getElementById('results-back-btn');
      const showResultsBtn = document.getElementById('show-results-btn');
      const resetBtn = document.getElementById('reset-btn');

      // Navigation between views
      function showHome() {
        candidateView.style.display = 'none';
        resultsView.style.display = 'none';
        homeView.style.display = 'block';
        candidateCategoryTitle.textContent = '';
        candidateListEl.innerHTML = '';
        thankYouMessage.textContent = '';
        thankYouMessage.classList.remove('visible');
        // Return focus to the results button for accessibility if coming back from results
        showResultsBtn.focus();
      }
      
      function showCandidates(category) {
        const displayCategory = categoryDisplayName(category);
        candidateCategoryTitle.textContent = `Candidates for ${displayCategory}`;
        candidateListEl.innerHTML = '';
        thankYouMessage.textContent = '';
        thankYouMessage.classList.remove('visible');

        const candidateData = candidates[category] || [];
        candidateData.forEach(candidate => {
          const card = document.createElement('div');
          card.className = 'candidate-card ' + categoryClass(category);
          card.setAttribute('role', 'listitem');

          // Add candidate logo
          const logoDiv = document.createElement('div');
          logoDiv.className = 'candidate-logo';
          const logoImg = document.createElement('img');
          logoImg.src = candidate.logo;
          logoImg.alt = `${candidate.name}'s photo`;
          logoDiv.appendChild(logoImg);
          
          const candidateNameEl = document.createElement('div');
          candidateNameEl.className = 'candidate-name';
          candidateNameEl.textContent = candidate.name;

          const voteBtn = document.createElement('button');
          voteBtn.className = 'vote-btn';
          voteBtn.textContent = 'Vote';
          voteBtn.setAttribute('aria-label', `Vote for ${candidate.name} in ${displayCategory}`);
          voteBtn.addEventListener('click', () => castVote(category, candidate.name));

          card.appendChild(logoDiv);
          card.appendChild(candidateNameEl);
          card.appendChild(voteBtn);
          candidateListEl.appendChild(card);
        });

        homeView.style.display = 'none';
        resultsView.style.display = 'none';
        candidateView.style.display = 'flex';
      }

      // Return a simplified house class name for styling candidate cards & results categories
      function categoryClass(cat) {
        if(cat.startsWith('green-house')) return 'green-house';
        if(cat.startsWith('yellow-house')) return 'yellow-house';
        if(cat.startsWith('red-house')) return 'red-house';
        if(cat.startsWith('blue-house')) return 'blue-house';
        if(cat.startsWith('head-')) return 'head';
        return '';
      }

      function categoryDisplayName(cat) {
        switch(cat) {
          case 'head-boy': return 'Head Boy';
          case 'head-girl': return 'Head Girl';
          case 'green-house-male': return 'Green House Captain (Male)';
          case 'green-house-female': return 'Green House Captain (Female)';
          case 'yellow-house-male': return 'Yellow House Captain (Male)';
          case 'yellow-house-female': return 'Yellow House Captain (Female)';
          case 'red-house-male': return 'Red House Captain (Male)';
          case 'red-house-female': return 'Red House Captain (Female)';
          case 'blue-house-male': return 'Blue House Captain (Male)';
          case 'blue-house-female': return 'Blue House Captain (Female)';
          default: return cat;
        }
      }

      // Vote counting and localStorage storage
      function castVote(category, candidate) {
        const storageKey = `votes_${category}`;
        const savedVotes = JSON.parse(localStorage.getItem(storageKey)) || {};
        savedVotes[candidate] = (savedVotes[candidate] || 0) + 1;
        localStorage.setItem(storageKey, JSON.stringify(savedVotes));

        // Show thank you message
        thankYouMessage.textContent = `Thank you for voting for ${candidate}!`;
        thankYouMessage.classList.add('visible');

        // Disable vote buttons to prevent multiple votes
        Array.from(candidateListEl.querySelectorAll('button.vote-btn'))
          .forEach(btn => btn.disabled = true);

        // After 3 seconds, return to home for next voter
        setTimeout(() => {
          showHome();
        }, 3000);
      }

      // Show results view
      function showResults() {
        resultsList.innerHTML = '';
        // For each category, list candidates and their vote counts
        for (const cat in candidates) {
          const categoryDiv = document.createElement('div');
          categoryDiv.className = 'result-category ' + categoryClass(cat);

          const categoryTitle = document.createElement('h3');
          categoryTitle.textContent = categoryDisplayName(cat);
          categoryDiv.appendChild(categoryTitle);

          const candidateVotesDiv = document.createElement('div');
          candidateVotesDiv.className = 'result-candidates';

          const storedVotesRaw = localStorage.getItem(`votes_${cat}`);
          let storedVotes = {};
          try {
            storedVotes = storedVotesRaw ? JSON.parse(storedVotesRaw) : {};
          } catch {
            storedVotes = {};
          }

          candidates[cat].forEach(candidate => {
            const candidateDiv = document.createElement('div');
            candidateDiv.className = 'result-candidate';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = candidate.name;

            const voteCountSpan = document.createElement('span');
            voteCountSpan.className = 'vote-count';
            voteCountSpan.textContent = storedVotes[candidate.name] || 0;

            candidateDiv.appendChild(nameSpan);
            candidateDiv.appendChild(voteCountSpan);
            candidateVotesDiv.appendChild(candidateDiv);
          });

          categoryDiv.appendChild(candidateVotesDiv);
          resultsList.appendChild(categoryDiv);
        }

        homeView.style.display = 'none';
        candidateView.style.display = 'none';
        resultsView.style.display = 'flex';

        // Focus on results heading for accessibility
        resultsView.focus();
      }

      // Reset votes: clear all voting data from localStorage
      function resetVotes() {
        if (confirm("Are you sure you want to reset all votes? This action cannot be undone.")) {
          for (const cat in candidates) {
            localStorage.removeItem(`votes_${cat}`);
          }
          alert("All votes have been reset.");
          // If currently on results view, refresh to show reset data
          if (resultsView.style.display === 'flex') {
            showResults();
          }
        }
        // Ensure focus returns correctly
        showResultsBtn.focus();
      }

      // Event listeners for category buttons
      document.querySelectorAll('button.vote-category-btn').forEach(button => {
        button.addEventListener('click', e => {
          const category = e.currentTarget.getAttribute('data-category');
          showCandidates(category);
        });
      });

      // Results button listener
      showResultsBtn.addEventListener('click', () => showResults());

      // Back from results button
      resultsBackBtn.addEventListener('click', () => showHome());

      // Reset button listener
      resetBtn.addEventListener('click', resetVotes);

      // Initial view
      showHome();
