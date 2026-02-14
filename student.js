// Supabase configuration
const SUPABASE_URL = 'https://dlvlerjuzfnjqgvoyumg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdmxlcmp1emZuanFndm95dW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTY3MDcsImV4cCI6MjA4NjYzMjcwN30.n6unLAvVRIU142uV3BGQ4EXFsvacinKZlm75eDWicwE'

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

const form = document.getElementById('submissionForm')
const submitBtn = document.getElementById('submitBtn')
const messageDiv = document.getElementById('message')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    submitBtn.disabled = true
    submitBtn.textContent = 'Uploading...'
    messageDiv.textContent = ''
    messageDiv.className = ''
    
    try {
        // Get form data
        const className = document.getElementById('className').value
        const studentName = document.getElementById('studentName').value
        const studentEmail = document.getElementById('studentEmail').value
        const assignmentTitle = document.getElementById('assignmentTitle').value
        const fileInput = document.getElementById('fileUpload')
        const file = fileInput.files[0]
        
        if (!file) {
            throw new Error('Please select a file')
        }
        
        // Upload file to Supabase Storage
        const fileName = `${Date.now()}_${file.name}`
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('assignments')
            .upload(fileName, file)
        
        if (uploadError) throw uploadError
        
        // Get public URL
        const { data: urlData } = supabase
            .storage
            .from('assignments')
            .getPublicUrl(fileName)
        
        // Save submission to database
        const { error: dbError } = await supabase
            .from('submissions')
            .insert({
                class_name: className,
                student_name: studentName,
                student_email: studentEmail,
                assignment_title: assignmentTitle,
                file_url: urlData.publicUrl,
                file_name: file.name
            })
        
        if (dbError) throw dbError
        
        // Success!
        messageDiv.className = 'success'
        messageDiv.textContent = '✅ Assignment submitted successfully!'
        form.reset()
        
    } catch (error) {
        messageDiv.className = 'error'
        messageDiv.textContent = '❌ Error: ' + error.message
    } finally {
        submitBtn.disabled = false
        submitBtn.textContent = 'Submit Assignment'
    }
})
