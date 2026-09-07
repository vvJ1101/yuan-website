import CoreGraphics
import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers
import Vision

enum CutoutError: Error {
  case unreadableInput
  case noForeground
  case missingColorSpace
}

let arguments = CommandLine.arguments
guard arguments.count == 3 else {
  fputs("Usage: remove-lookbook-background.swift input output\n", stderr)
  exit(64)
}

let inputURL = URL(fileURLWithPath: arguments[1])
let outputURL = URL(fileURLWithPath: arguments[2])
guard let input = CIImage(contentsOf: inputURL, options: [.applyOrientationProperty: true]) else {
  throw CutoutError.unreadableInput
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: input)
try handler.perform([request])
guard let result = request.results?.first else {
  throw CutoutError.noForeground
}

let maskBuffer = try result.generateScaledMaskForImage(
  forInstances: result.allInstances,
  from: handler
)
let mask = CIImage(cvPixelBuffer: maskBuffer)
  .applyingFilter("CIMorphologyMinimum", parameters: [kCIInputRadiusKey: 3.5])
  .applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: 1.25])
  .cropped(to: input.extent)
let transparent = CIImage(color: .clear).cropped(to: input.extent)
let cutout = input.applyingFilter("CIBlendWithMask", parameters: [
  kCIInputBackgroundImageKey: transparent,
  kCIInputMaskImageKey: mask,
])

try FileManager.default.createDirectory(
  at: outputURL.deletingLastPathComponent(),
  withIntermediateDirectories: true
)
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else {
  throw CutoutError.missingColorSpace
}
try CIContext().writePNGRepresentation(
  of: cutout,
  to: outputURL,
  format: .RGBA8,
  colorSpace: colorSpace
)
