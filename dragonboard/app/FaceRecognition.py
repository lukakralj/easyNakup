
import cv2
from configParser import ConfigParser
import face_recognition
import os
class FaceRecognition():
    def __init__(self):
        super().__init__()
        self.video_capture = cv2.VideoCapture(0)
        self.loadData()
        self.face_locations = []
        self.face_encodings = []
        self.face_names = []
        self.process_this_frame = True
        self.numberOfImages = len(self.known_face_encodings)

    def loadData(self):
        self.parser = ConfigParser()
        self.known_face_encodings = self.encodeImages()
        self.known_face_names = self.parser.fetchFaceAttribute("personName")
        self.known_face_address = self.parser.fetchFaceAttribute("address")
        self.known_face_phone = self.parser.fetchFaceAttribute("phone_no")
        print('Now there are:'+str(len(self.known_face_encodings)))

    def encodeImages(self):
        images = []
        for filename in self.parser.fetchFaceAttribute("filename"):
            print('Loading '+filename)
            img = face_recognition.load_image_file(filename)
            images.append(face_recognition.face_encodings(img)[0])
        return images

    def run(self):
        while True:
            address = ''
            usr_name = ''
            phone_no = -1
            lst = os.listdir('./images')  # dir is your directory path
            number_files = len(lst)
            if number_files != self.numberOfImages:
                self.numberOfImages = number_files
                self.loadData()
            # Grab a single frame of video
            ret, frame = self.video_capture.read()

            # Resize frame of video to 1/4 size for faster face recognition processing
            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            rgb_small_frame = small_frame[:, :, ::-1]

            # Only process every other frame of video to save time
            if self.process_this_frame:
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
                    face_names.append(name)
                 # Display the results
            for (top, right, bottom, left), name in zip(face_locations, face_names ):
                # Scale back up face locations since the frame we detected in was scaled to 1/4 size
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4
                color = (0,255,0) if name is not 'Unknown' else (0,0,255)
                # Draw a box around the face
                cv2.rectangle(frame, (left, top), (right, bottom), color, 2)

                # Draw a label with a name below the face
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), color, cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

            # Display the resulting image
            cv2.imshow('Video', frame)

            # Hit 'q' on the keyboard to quit!
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            if usr_name is not '':
                return name, address, phone_no
            self.process_this_frame = not self.process_this_frame



print (FaceRecognition().run())