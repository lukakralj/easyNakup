from GPIOLibrary import GPIOProcessor
import time

GP = GPIOProcessor()

pin1 = GP.getPin33()
pin2 = GP.getPin34()

pin1.input()
pin2.input()

i = 0
while(i < 1000):
    print("pin1: " + pin1.getValue() + ", pin2: " + pin2.getValue())
    i += 1


