import cv2
from configParser import ConfigParser
import face_recognition
import os
import sys

class FaceRecognition():
    def __init__(self,image_path):
        super().__init__()
        self.image_capture = cv2.imread(image_path)
        self.loadData()
        self.face_locations = []
        self.face_encodings = []
        self.face_names = []
        self.process_this_frame = True
        self.numberOfImages = len(self.known_face_encodings)

    def loadData(self):
        self.parser = ConfigParser(sys.argv[2])
        self.known_face_encodings = self.encodeImages()
        self.known_face_names = self.parser.fetchFaceAttribute("personName")
        self.known_face_address = self.parser.fetchFaceAttribute("address")
        self.known_face_phone = self.parser.fetchFaceAttribute("phone_no")
        self.known_face_city = self.parser.fetchFaceAttribute("city")
        self.known_face_country = self.parser.fetchFaceAttribute("country")


    def encodeImages(self):
        images = []
        for filename in self.parser.fetchFaceAttribute("filename"):
            img = face_recognition.load_image_file(filename)
            images.append(face_recognition.face_encodings(img)[0])
        return images

    def run(self):
    
        address = ''
        usr_name = ''
        phone_no = -1
        city = ''
        country = ''
        lst = os.listdir(sys.argv[2]+'/images')  # dir is your directory path
        number_files = len(lst)
        if number_files != self.numberOfImages:
            self.numberOfImages = number_files
            self.loadData()


        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(self.image_capture, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

     
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(
            rgb_small_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_small_frame, face_locations
        )

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(
                self.known_face_encodings, face_encoding
            )
            name = "Unknown"

            # If a match was found in known_face_encodings, just use the first one.
            if True in matches:
                first_match_index = matches.index(True)
                name = self.known_face_names[first_match_index]
                usr_name = self.known_face_names[first_match_index]
                address = self.known_face_address[first_match_index]
                phone_no = self.known_face_phone[first_match_index]
                city = self.known_face_city[first_match_index]
                country = self.known_face_country[first_match_index]
            face_names.append(name)
    

            if usr_name is not '':
                return {"name":name, "address":address,"city":city,"country":country, "phone_no":phone_no}
            else:
                return False



image = os.path.abspath(sys.argv[1])
if image:
    print(FaceRecognition(image).run())