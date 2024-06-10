document.getElementById('showCanoes').addEventListener('click', function() {
    console.log('showCanoes clicked');
    document.querySelectorAll('.kayaks').forEach(function(item) {
        item.classList.add('hidden');
        item.classList.remove('block');
    });
    document.querySelectorAll('.canoes').forEach(function(item) {
        item.classList.add('block');
        item.classList.remove('hidden');
    });
});

document.getElementById('showKayaks').addEventListener('click', function() {
    console.log('showKayaks clicked');
    document.querySelectorAll('.canoes').forEach(function(item) {
        item.classList.add('hidden');
        item.classList.remove('block');
    });
    document.querySelectorAll('.kayaks').forEach(function(item) {
        item.classList.add('block');
        item.classList.remove('hidden');
    });
});

// Initial load to show all items
document.querySelectorAll('.canoe-item').forEach(function(item) {
    item.classList.add('block');
    item.classList.remove('hidden');
});

//show both canoes and kayaks
document.getElementById('showBoth').addEventListener('click', function() {
    console.log('showBoth clicked');
    document.querySelectorAll('.canoe-item').forEach(function(item) {
        item.classList.add('block');
        item.classList.remove('hidden');
    });
});