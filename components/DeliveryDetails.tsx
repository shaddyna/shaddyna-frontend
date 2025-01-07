interface DeliveryDetailsProps {
    task: {
      orderId: string;
      customerName: string;
      deliveryAddress: string;
      orderItems: string[];
      status: 'Pending' | 'In Progress' | 'Completed';
    };
  }
  
  const DeliveryDetails = ({ task }: DeliveryDetailsProps) => {
    return (
      <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Order Details</h2>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Order ID: {task.orderId}</p>
          <p className="text-sm font-medium text-gray-600">Customer: {task.customerName}</p>
          <p className="text-sm font-medium text-gray-600">Address: {task.deliveryAddress}</p>
          <ul className="space-y-1">
            {task.orderItems.map((item, index) => (
              <li key={index} className="text-sm text-gray-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <span
          className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
            task.status === 'In Progress'
              ? 'bg-blue-100 text-blue-600'
              : task.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-green-100 text-green-600'
          }`}
        >
          {task.status}
        </span>
      </div>
    );
  };
  
  export default DeliveryDetails;
  