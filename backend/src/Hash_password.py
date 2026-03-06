import hashlib

password = input("Enter your password: ")
hashed = hashlib.sha256(password.encode()).hexdigest()
with open("password.hash", "w") as f:
    f.write(hashed)
print("password saved")
