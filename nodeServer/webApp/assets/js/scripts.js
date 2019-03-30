


function displayTable() {

    let tbody = document.getElementById("tbody");
    let modals = document.getElementById("modals");
    let tbodyInner = ""
    let modalsInner = ""

    const Http = new XMLHttpRequest();
    const url = 'http://localhost:8080/user/getAll';
    let called = false;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        if (!called) {

            let orders = Http.responseText;
            orders = JSON.parse(orders)

            ids = []

            orders.forEach((order) => {
                if (!ids.includes(order._id)) {
                    tbodyInner += createTableRow(order)
                    modalsInner += createModal(order)
                    let modalID = "#modal" + order._id;
                    let clRow = ".clickable-row-" + order._id;
                    jQuery(document).ready(function ($) {
                        $(clRow).click(function () {
                            $(modalID).modal('show');
                        });
                        completeOrder = "#order_completed"+order._id;
                        $(completeOrder).click(()=>{
                            var http1= new XMLHttpRequest();
                            var url1 = 'http://localhost:8080/user/remove';
                            var params = `_id=${order._id}`;
                            http1.open('POST', url1, true);
                            
                            //Send the proper header information along with the request
                            http1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            
                            http1.onreadystatechange = function() {//Call a function when the state changes.
                                if(http1.readyState == 4 && http1.status == 200) {
                                    alert(http.responseText);
                                }
                            }
                            http1.send(params)
                            $('#close_modal').click();
                            displayTable();
                             
                        })
                    });
                    ids.push(order._id)
                }
            });

            called = true;

            tbody.innerHTML = tbodyInner;
            modals.innerHTML = modalsInner;
            generateRouteQuery(orders);
        }

    }


}
displayTable();

function generateRouteQuery(orders) {
    let routeButton = document.getElementById("routeButton");
    let urlQuery = "?";

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        let address = order.address
        console.log(address)
        urlQuery += ("w" + i + "=" + address)
        if (i != orders.length - 1) {
            urlQuery += "&"
        }
    }


    routeButton.innerHTML = ` <a href="maps.html${urlQuery}" >
    <i class="fa fa-map-marker"></i>
    <p class="hidden-lg hidden-md"> Get Route</p>
</a>`

}

function createTableRow(order) {
    return `<tr data-order_id="${order._id}" class='clickable-row-${order._id}' data-href='dashboard.html'>
        <td>${order.user}</td>
        <td>${getAmountOfOrder(order)}€</td>
        <td>${order.address}</td>
        <td>${order.county}</td>
        <td>${order.city}</td>
    </tr>`
}

function createModal(order) {
    return `
   <div id="modal${order._id}" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Order Information</h4>
            </div>
            <div class="modal-body">
                <div class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="header">
                                        <h4 class="title">List of Items</h4>
                                    </div>
                                    <div class="content table-responsive table-full-width">
                                        <table class="table table-hover table-striped">
                                            <thead>
                                                <th>Item</th>
                                                <th>Amount</th>
                                                <th>Price</th>
                                            </thead>
                                            <tbody>
                                                ${getItemsFromOrder(order)}
                                            </tbody>
                                        </table>
                                    </div>
                                    <h3>Total: ${getAmountOfOrder(order)} €</h3>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="modal-footer">
                    <button id="close_modal" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-default" id="order_completed${order._id}">Order Completed</button>
            </div>
            </div>
        </div>
    </div>
    </div>
`;
}


function getItemsFromOrder(order) {

    itemshtml = "";

    const o = JSON.parse(order.orderJSON);
    items = []
    try {
        items = Object.keys(o);
    } catch{
        console.error("order is empty")
    }
    items.forEach((i) => {
        itemshtml += `
        <tr>
            <td>${i}</td>
            <td>${o[i]}</td>
            <td>${getItemPrice(i) * o[i]}€</td>
        </tr>
        `
    });

    return itemshtml;

}

function getAmountOfOrder(order) {
    const o = JSON.parse(order.orderJSON);
    const items = Object.keys(o);
    sum = 0.0;
    items.forEach((i) => {
        sum += (parseFloat(o[i]) * getItemPrice(i));
    });

    return sum;
}


function getItemPrice(i) {
    switch (i) {
        case "egg":
            return 1.00;
        case "eggs":
            return 1.00;
        case "milk":
            return 1.00;
        case "deodorant":
            return 2.99;
        case "pen":
            return 0.99;
        case "pens":
            return 0.99;
        case "smartphone":
            return 399.99;
        default:
            return 12.99;
    }
}

function getRandomDouble(min, max) {
    var n = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
    return n.toFixed(2)

}