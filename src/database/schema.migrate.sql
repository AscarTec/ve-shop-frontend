-- جدول العملاء
CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    source ENUM('bot', 'manual') DEFAULT 'manual',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- الأنشطة
CREATE TABLE IF NOT EXISTS activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- الخدمات
CREATE TABLE IF NOT EXISTS activity_services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    activity_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    duration INT NOT NULL DEFAULT 60,
    price DECIMAL(10,2) NOT NULL,
    deposit_pct DECIMAL(5,2) DEFAULT 50.0,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- الحجوزات
CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    service_id INT NOT NULL,
    date DATE NOT NULL,
    time_from TIME NOT NULL,
    time_to TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_by ENUM('bot', 'admin') DEFAULT 'bot',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES activity_services(id) ON DELETE CASCADE
);

-- المدفوعات
CREATE TABLE IF NOT EXISTS payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_type ENUM('deposit', 'remaining') NOT NULL,
    status ENUM('pending', 'paid') DEFAULT 'pending',
    method ENUM('cash', 'card', 'transfer', 'online') DEFAULT 'cash',
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
