const cart = {}

function addToCart(event) {
    const btn = event.target
    const cardBody = btn.parentNode
    const name = cardBody.querySelector('h5').innerText
    let price = cardBody.querySelector("p").innerText
    price = price.replace(/,/g, '')
        .replace(' vnđ', '')
    price = Number(price)
    const id = btn.getAttribute('data-id')

    const product = {
        id: id,
        name: name,
        price: price,
        total: 1
    }

    // kiểm tra xem sp có trong giỏ hàng hay chưa
    if (cart[id]) { // nếu sp đã có trong giỏ hàng
        const currentProductInCart = cart[id]
        currentProductInCart.total++
    } else { // nếu sp chưa có trong giỏ hàng
        cart[id] = product
    }

    // render lại giỏ hàng
    render()
    console.log(cart)
}

function render() {
    // hiển thị vào ol
    const ol = document.getElementById('cart-list')
    let html = ''
    let totalPrice = 0
    for (let key in cart) {
        if (cart.hasOwnProperty(key)) {
            const currentProductInCart = cart[key]
            const total = currentProductInCart.price * currentProductInCart.total
            totalPrice += total
            html += `
            <hr>
                <li>
                    <p id="id">${currentProductInCart.id}</p>
                    <p id="ten">${currentProductInCart.name}</p>
                    <p id="gia">${currentProductInCart.price}</p>
                    <p id="sl">${currentProductInCart.total}</p>
                    <p id="tt">${currentProductInCart.price}</p>
                    <p id="xoa"onclick="deleteProduct('${currentProductInCart.id}')">Xóa</p>
                    </li>
                    `
                // <p>ID: ${currentProductInCart.id}</p>
                //     <p>Tên sản phẩm: ${currentProductInCart.name}</p>
                //     <p>Giá: ${currentProductInCart.price}</p>
                //     <p>Số lượng: ${currentProductInCart.total}</p>
                //     <p>Thành tiền: ${currentProductInCart.price}</p>
                //     <p onclick="deleteProduct('${currentProductInCart.id}')">Xóa</p>
                //     </li>
                // <p>Tổng giá trị đơn h: ${total}</p>
                // <input onchange="updateTotalProduct(event, '${currentProductInCart.id}')" type="number" value="${currentProductInCart.total}"/>
        }
    }
    html += `
        <hr>
        <strong>
            <p>Tổng giá trị đơn hàng: ${totalPrice}</p>
        </strong>
    `
    ol.innerHTML = html
}

function updateTotalProduct(event, id) {
    const value = event.target.value
    cart[id].total = value
    render()
}

function deleteProduct(id) {
    if (cart[id]) {
        const result = confirm('Bạn có chắc chắn muốn xóa không?')
        if (result) {
            // xóa
            delete cart[id]
        }
    }
    render()
}
