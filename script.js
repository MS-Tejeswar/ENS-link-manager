const providerUrl = 'https://eth-mainnet.alchemyapi.io/v2/<alchemy api key>';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

document.getElementById('newUserBtn').addEventListener('click', function () {
    document.getElementById('userTypeSection').classList.add('hidden');
    document.getElementById('newUserSection').classList.remove('hidden');
});

document.getElementById('existingUserBtn').addEventListener('click', function () {
    document.getElementById('userTypeSection').classList.add('hidden');
    document.getElementById('existingUserSection').classList.remove('hidden');
});

document.getElementById('checkEns').addEventListener('click', async function () {
    const ensName = document.getElementById('ensInput').value;
    try {
        const address = await web3.eth.ens.getAddress(ensName);
        if (address) {
            document.getElementById('linkSection').classList.remove('hidden');
        } else {
            alert('The ENS name is not registered.');
        }
    } catch (error) {
        if (error.message.includes("Returned values aren't valid") || error.message.includes("The resolver at")) {
            alert('The ENS name is not registered.');
        } else {
            console.error('Error occurred:', error);
        }
    }
});

document.getElementById('submitLink').addEventListener('click', async function () {
    const ensName = document.getElementById('ensInput').value;
    const link = document.getElementById('linkInput').value;

    if (link && ensName) {
        try {
            const response = await fetch('http://localhost:3000/storeLink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ensName, link }),
            });

            if (response.ok) {
                alert('ENS name and link saved successfully!');
            } else {
                alert('Failed to save the data.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    } else {
        alert('Please provide a valid link.');
    }
});

document.getElementById('updateLink').addEventListener('click', async function () {
    const ensName = document.getElementById('existingEnsInput').value;
    const oldLink = document.getElementById('oldLinkInput').value;
    const newLink = document.getElementById('newLinkInput').value;

    if (ensName && oldLink && newLink) {
        try {
            const response = await fetch(`http://localhost:3000/updateLink`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ensName, oldLink, newLink }),
            });

            if (response.ok) {
                alert('Link updated successfully!');
            } else {
                alert('Failed to update the link.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    } else {
        alert('Please fill in all fields.');
    }
});
