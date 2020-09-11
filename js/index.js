// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
// tại sao lại có [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0]. 
// Nếu mình có 2 cái component cùng class thì khi[0] nó sẽ hiển thị component 1 còn[1] thì nó sẽ hiển thị component 2.
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}
close_footer.onclick = function () {
    modal.style.display = "none";
}
order.onclick = function () {
    paySuccess();
    modal.style.display = "none";
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    cart_item.remove(cart_rows);
    document.getElementsByClassName("cart-total-price")[0].innerText = "0";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// xóa Cart

var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i];
    button.addEventListener("click", function () {
        var button_remove = event.target;
        button_remove.parentElement.parentElement.remove();
        updateCart();
    })
}

// update cart

function updateCart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (let i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i];
        var price_item = cart_row.getElementsByClassName("cart-price")[0];
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0];
        var price = price_item.innerText.substring(1);
        var quantity = quantity_item.value;
        total = total + (price * quantity);
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total + ".00";
}


// thay đổi số lượng SP

var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
    var input = quantity_input[i];
    input.addEventListener("change", function (event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCart();
    })
}

// thêm vào giỏ hàng

var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
    var add = add_cart[i];
    add.addEventListener("click", function (event) {
        var button = event.target;
        var product = button.parentElement.parentElement;
        var img = product.parentElement.getElementsByClassName("img-prd")[0].src;
        var title = product.getElementsByClassName("content-product-h3")[0].innerText;
        var price = product.getElementsByClassName("price")[0].innerText;
        addItemToCart(title, img, price);
        modal.style.display = "block";
        updateCart();
    })
}

function addItemToCart(title, img, price) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cart_title = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cart_title.length; i++) {
        if (cart_title[i].innerText == title) {
            alert("Products already in the cart!!")
            return;
        }
    }

    var cartRowContent = `
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${img}"/>
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">Delete</button>
                    </div>
                        `

    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", function () {
        var button_remove = event.target;
        button_remove.parentElement.parentElement.remove();
        updateCart();
    })
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", function () {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCart();
    })
}


function paySuccess() {
    Swal.fire(
        'Success',
        'Thank you for your order payment!!',
        'success'
    )
}

