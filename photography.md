[karl]: http://www.designinaction.com/wp-content/uploads/2014/10/Karl.png
[camera]: https://upload.wikimedia.org/wikipedia/commons/2/26/Camera_obscura_box.jpg
[gras]: https://upload.wikimedia.org/wikipedia/commons/f/f6/Niepce_1826.jpg
[cut]: https://upload.wikimedia.org/wikipedia/commons/8/8e/E-30-Cutmodel.jpg
[ccd]: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/CCD.jpg/658px-CCD.jpg
[pixel]: https://upload.wikimedia.org/wikipedia/commons/f/f2/Resolution_illustration.png
[size]: https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sensor_sizes_overlaid_inside_-_updated.svg/550px-Sensor_sizes_overlaid_inside_-_updated.svg.png
[f]: https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Aperture_diagram.svg/640px-Aperture_diagram.svg.png
[f2]: https://upload.wikimedia.org/wikipedia/commons/d/d7/Apertures.jpg

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>
  $("h1, h2, h3, h4, h5, h6").click(function() {
    var obj = $(this);
    for (var i=0; i <100; i++) {
      obj = obj.next();
      if (obj[0].tagName == "HR") return;
      else obj.slideToggle();
    }
  });
</script>

![camera]

# Photography Fun Day at the Pennypit

1. [Welcome](#welcome)
1.1. [Schedule](#schedule)
2. [Sessions](#sessions)
2.1 [Morning](#morning)
2.1 [Afternoon](#afternoon)
3. [Assignment](#assignment)

---

# Welcome

![karl]

I'm Karl, and I will be your tutor for today together with Ang.
I am a research student at The University of Edinburgh in computing, but I also have 
a personal interest in photography:

- I got my first digital camera about 10 years ago.
- I've been teaching courses at Pennypit for three years now.
- This is the first time we're doing a photography fun day.
- I'm keen to build on ideas from you, and be flexible with topics and structure.

If you have any questions, just ask!


---

## Schedule

The aim of today is to explore your camera and experiment with taking pictures.
The rough plan for today looks like this:

  - 9.15am – Welcome tea & coffee.
  - 9.30am – Morning session: outline of the day, discussion of ideas and the creative brief, photographic technique basics (composition).
  - 10.30am – Equipment checks over tea & coffee.
  - 11am – Travel to location.
  - 12.45pm – Return to Pennypit Centre for lunch.
  - 2pm – Afternoon session: presentations of images; peer critique;
  - 3pm – Advanced photographic techniques; exposure; aperture, shutter speed and ISO; Q&A; resources.
  - 4pm – Close


---

# Sessions

---

## Morning

This morning you will:

* Understand the main parts of a digital camera and terminology.
* Receive answers to questions you may have about your own cameras, jargon, etc.

---

### What is photography?

Photography is about capturing light on a light sensitive medium (film).

It has a fascinating history. Development of film was very challenging due to
the chemical knowledge involved. The principles of seeing an image using a 
pinhole camera was described 4th and 5th BC in Greece and China. But the first
permanent photograph was only taken in 1826 (see picture below). 

![gras]

One of the earliest photographs. View from the Window at Le Gras, the first
successful permanent photograph created by Nicéphore Niépce in 1826 or 1827, 
in Saint-Loup-de-Varennes. Captured on 20 × 25 cm oil-treated bitumen.
Due to the 8-hour exposure, the buildings are illuminated by the sun from 
both right and left.

### What is a camera?

A camera consists of the following:

* A dark, light-tight chamber.
*  A light sensitive film or CCD.
*  An opening of a given size (called aperture) which lets in light.
  *  This could be a pinhole, or a lens.
* A shutter or curtain to open or close the opening.
  * Used to control how long the film is exposed to the light.

Did you recognise the camera obscura at the top?

### Types of digital cameras

![cut]

First it is useful to distinguish between different types of digital cameras:

* Camera phone (camera is an additional benefit; no zoom; few manual controls)
* Point and shoot (good first camera; often 3x zoom lens; compact; some manual control)
* Bridge camera (for more advanced users; often "superzoom" >10x zoom lens; larger; some more manual controls)
* DSLRs (usually bigger with larger sensor; interchangable lenses; manual control;)

DSLR stands for Digital Single-Lens Reflex.

Generally going down the list, cameras become more expensive, yield better image quality,
and allows more creative control over photos.

### Main components of a digital camera

#### CCD/CMOS Sensor (film)


![ccd]

* A light-sensitive silicon chip, developed in 1960 onwards.
* Has the same function as film in traditional cameras -- i.e. capture the image.
* CMOS is a competing and less common technology, which we won't discuss here.

#### CCD working principle

Here an attempt at a basic explanation:

* Instead of relying on chemical reaction (silver halide) like film, CCDs works through the [http://en.wikipedia.org/wiki/Photoelectric_effect photoelectric effect].
* In simple terms, electrons are freed when light strikes a surface (same principles as in solar cells).
* The CCD captures the pattern of freed electrons to make an image.
* The data is stored on a solid state drive memory card.

CCDs are complex, so if you are interested in self-study here are some further reading/watching:

* [http://en.wikipedia.org/wiki/Charge-coupled_device CCD article on Wikipedia]
* [http://www.youtube.com/watch?v=51Za3FY1axI CCD inventors explain working principle] (Youtube)
* [http://www.youtube.com/watch?v=bqJksXwrx7U Video of the making of a CCD] (Youtube)


#### Pixels, megapixels and resolution

![pixel]

* A pixel is a dot of a given colour.
* Digital images are made up of millions of pixels.
* Megapixel is a common measurement of the resolution of a ditigal image.
* A 10 megapixel camera would generate images that contain 10 million pixels.
* That would give images with a resolution of about 3648 by 2736 pixels (assuming 4:3 aspect ratio).


#### Sensor size and image quality

Image resolution (e.g. number of megapixels) and quality are usually conflated or thought to be the same thing.

This is not always so. Let's consider the role of sensor size.

![size]

* Just like film, CCD sensors come in different sizes (see picture).
* Sensor size is not the same as megapixel (image resolution).
* It is the physical dimension of the actual sensor.
* Big sensors are expensive and yield higher quality images than small.
* This is because a large sensors will have more photosites than a small sensor, yielding higher definition.
* Large sensors have less noise and are more suitable in low light and action photography.
* Large sensors also have a shallower depth of field, making it easier isolate a subject from the background.
* A small sensor is cheaper to make, requiring a smaller lens, and vice versa.
* Generally point and shoot cameras use smaller sensors than DSLRs.

We rarely hear about sensor size in camera advertisement. This is why:

* Increasing the megapixel resolution of the images is cheap.
* The camera essentially scales the image using the information from the same small sensor.
* This means you get less defined/sharp images than if you used a larger sensor.
* However, enlarging the sensor is expensive and would make cameras less affordable.
* Generally when you buy a camera, sensor size is more important for image quality than megapixels.


### Camera lens/objective

* Lenses focus the light on the sensor/film.
* Lenses are made up of several glass elements (can be as many as 20).
* Some lenses have focusing and image stabilisation mechanisms built into them.
:* Point and shoot cameras with very small lenses can be slow to focus, especially in low light.
:* Stabilisation helps to get clear images when long shutter speeds are required.
:* Image stabilisation can be built into the sensor rather than the lens (e.g. Olympus does this)

#### Lens aperture (e.g. f/2.8)

* The aperture refers to the size of the opening of the front element of the lens.
* Often the aperture (e.g. f/3.5-5.6) is printed in the lens.
* Aperture determines the light gathering ability of a lens.
:* Aperture corresponds to the width in the [http://www.cambridgeincolour.com/tutorials/camera-exposure.htm bucket metaphore] (Cambridge in Colour)

A "fast" lens is a lens which has a large aperture and can collect a lot of light.

![f]

Common aperture sizes - notice as the f-number increases, the aperture (opening) decreases.

![f2]

A large (f/2.8) and small (f/16) aperture, achieved by opening and closing the diagragm.



#### Focal length

* The focal length of a lens is the field of view, or angle of view it can capture.
* Focal length depends on the sensor size.
* Because sensors can be of many sizes and shapes, the focal length of lenses are often specified in 35mm equivalents.
* This is a standard comparison because of 35mm film being common.

These are the main categories for 35mm equivalent focal lengths:

* Wide angle (<28mm)
* Normal (50mm)
* Portrait (around 100mm)
* Tele (>200mm)

Let's have a look at some examples on Wikipedia:
: http://en.wikipedia.org/wiki/Angle_of_view#Examples

#### Zoom vs primes (fixed focal length lenses)

* A zoom lens is one which allows you to change the field of view (you may think of this as magnification)
* Zoom lenses are practical because you can change the composition easily.
:* For example to get more of the surrounding in the image by zooming out, or vice versa.
* The downside is that zooms may be less sharp and have a slower aperture than prime lenses.

* A prime lens is a lens with a single focal length.
* Because it has a single focal length it can be smaller, sharper and have a larger aperture than a zoom lens.
* But it takes more work to compose your images (you zoom with your feet).

#### Image engine

Once the CCD has captured the image data, the camera has onboard computer that saves the data into an image file.

The image engine is responsible for converting this data into a JPEG file.

Some cameras also have advanced features, including:

* Filters (black and white, colour tints, effects)
* Stitching several images together to form a panorama


#### Storage system

All digital cameras needs somewhere to store the images.

This is often on a solid state drive, or just a flash drive.

Different cameras use different memory cards, including:
* SDHC/SDXC (most common)
* Compact Flash (used on DSLRs)
* Various other sticks (less common)


#### Display and viewfinder

* All digital cameras nowadays have a display to allow you to view your pictures.

The display also contains useful information such as:
* Settings
* Battery and memory status (remaining pictures)
* Exposure (next week)
* Framing aids (e.g. grid)

Some cameras also have a viewfinder.

* A little window you can put your eye against and look through when composing the image.
* Can be optical or electronic (same view as on display)
* Viewfinders are less common on point and shoots, compared to DSLRs.
* But they really help to get less shaky pictures and see what you are doing.

#### Pop-up flash and hotshoe socket

* The flash adds light to a scene.
* Don't over use it - it causes unwanted and harsh highlights.
* Built-in camera flash doesn't have very long effective reach (a few meters only)

Some cameras have a hotshoe socket. This allows you to attach a more powerful flash to the camera.


#### Body and buttons


A camera is essentially a light tight box. We call this the body.

The design can vary a lot between manufacturers, but will typically have:

* Shutter button
* On/off switch
* Menu button and arrow keys
* Mode dials (e.g. Auto, P, A, S, M, Video)


#### Battery and connectivity

Cameras need power.

* NiMH rechargeable batteries are recommended for point and shoots.
* Rechargeable lithium batteries usually for DSLRs.

Cameras interface with your computer/TV via

* USB
* Memory card reader
* HDMI/VGA/Video-out
* Bluetooth, Wifi

It can also have:

* GPS, for recording position of where image was taken
* Shutter release control
* Microphone in (for video)


#### Other photographic equipment

* Filters
:* UV, neutral density (ND), Polarizing filter, star effect, etc
* Tripod, monopod, (can be very expensive)
* Light meters
* External flash (hotshoe, ring flash)
* Bounce cards/reflectors
* Grey cards
* Soft boxes


---

## Assignment

The purpose of the briefs is to give you a question, theme or goal to encourage you
to think about how you take pictures. There are three briefs, but you can also suggest
your own. You are highly encouraged to work with others! 
Be prepared to present some of your pictures in class and discuss which 
ones you liked the most? Why? How did you create them? What did you learn by 
taking the pictures, and from the work of others in class? Remember, there often
isn't a right and wrong answer.


### Brief 1. Experimental portraiture - Can you take an unusual picture of someone?

People photography is popular, but very hard to do in an interesting way. Recruit a friend as model. Alternate between sitting model and taking pictures. Try out different ways of framing the shot, positioning the sitter, adjusting the way your model is lit and the range of emotions or gestures they can convey. Try both black and white, and colour. Instruct your model how to pose.

### Brief 2. Vertical landscapes - Most landscapes are shot horizontally, what happens when you shot vertically?

This is an example of constrait-based photography. This is where you change the way you normally shoot by imposing a rule on how you can take your picture. In this case, you have to work creatively with the new aspect ratio that vertical framing brings. By constraining some of your choices, you must think more critically about how you normally go about taking photos. If you want a additional challenge, you could try always shooting in backlit scenes (although this may not work summer at noon).

### Brief 3. Abstract art - Can you find and capture interesting patterns or fields of colour in your environment, perhaps from something that otherwise goes unnoticed?

Photographs can be visual art pieces that don't necessarily have to tell a story. This brief can give you a good opportunity to practice macro (close-up) photography, but you could also use non-macro techniques. Some suggestions include experimenting with the framing of the shot, arranging the subject matters and manual focusing (or use the pre-focus function of your camera by holding the shutter down half-way and then reframing before taking the picture). Scan your environment for textures (bark, dried ground, etc), fields of contrasting colour (sky/horizon; treelines; painted structures), interesting shapes, both organic and man-made. 